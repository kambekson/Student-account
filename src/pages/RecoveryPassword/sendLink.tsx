import { getSubdomain } from "@/shared/lib/utils";
import { notifyError } from "@/shared/ui/Toasts/options";
import { UserAPI } from "@/entities/User";
import { InformationSystemError, subcodeMap } from "@/entities/Common";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/shared/ui/Switcher/LanguageSwitcher";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const useNotEmpty = (
  value: string,
  textError: string,
  setTextError: (value: string) => void
) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setTextError(value ? "" : textError);
  }, [value, textError, setTextError]);
};

export const SendLinkPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [textError, setTextError] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [isSendCodeDisabled, setSendCodeDisabled] = useState(false);
  const [sendOneTime, setSendOneTime] = useState(false);
  const [sendTimeLeft, setSendTimeLeft] = useState(0);
  const [isSendTimerRunning, setSendTimerRunning] = useState(false);

  const domain = getSubdomain();

  const { t } = useTranslation();

  useNotEmpty(email, t("Поле не может быть пустым"), setTextError);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSendTimerRunning && sendTimeLeft > 0) {
      timer = setInterval(() => {
        setSendTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (sendTimeLeft <= 0) {
      setSendTimerRunning(false);
    }

    return () => clearInterval(timer);
  }, [isSendTimerRunning, sendTimeLeft]);

  const handleButtonClick = async () => {
    if (textError || (isSendTimerRunning && sendTimeLeft)) {
      return;
    }

    setDisabled(true);
    setSendCodeDisabled(true);

    try {
      await UserAPI.recoveryPasswordSendLink({
        domain: domain ?? "",
        email: email,
      });

      setSendOneTime(true);
      setSendTimeLeft(60);
      setSendTimerRunning(true);
    } catch (e: unknown) {
      let msg: string;
      if (e instanceof InformationSystemError) {
        msg = e.subcode ? subcodeMap[e.subcode] : e.message;

        if (e.code >= 500) {
          notifyError(`${t("Не удалось отправить письмо")}.`, t(msg));
        } else {
          setTextError(msg);
        }
      } else {
        notifyError(
          `${t("Не удалось отправить письмо")}.`,
          t("Неизвестная ошибка")
        );
        console.error("send email error", e);
      }
    } finally {
      setDisabled(false);
      setSendCodeDisabled(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-[400px]">
      <div className="text-xl font-bold text-[var(--color-text)]">{t("Восстановление пароля")}</div>
      <div className="w-full flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-500">{t("Электронная почта")}</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          disabled={isDisabled}
          className={`h-11 ${textError ? "border-[var(--color-alert)] focus-visible:ring-[var(--color-alert)]" : ""}`}
        />
        {textError && (
          <span className="text-xs text-[var(--color-alert)] font-medium mt-0.5">{textError}</span>
        )}
      </div>
      {!sendOneTime ? (
        !isDisabled ? (
          <Button
            className="w-full h-11 bg-[var(--color-accent-2)] hover:bg-[var(--color-accent-2)]/90 text-white font-semibold rounded-xl shadow-md transition-all active:scale-[0.98]"
            onClick={handleButtonClick}
            disabled={isDisabled}
          >
            {t("Продолжить")}
          </Button>
        ) : (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent-2)]"></div>
        )
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <span className="text-sm text-[var(--color-text-2)] text-center">
            {t(
              "Мы отправили письмо с ссылкой на восстановление пароля на Вашу почту"
            )}
            .
          </span>
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <span className="text-xs text-gray-500">{t("Еще не получили письмо")}?</span>
            {!isSendCodeDisabled ? (
              <Button
                variant="ghost"
                className="h-9 px-3 text-xs"
                disabled={isSendCodeDisabled}
                onClick={handleButtonClick}
              >
                {isSendTimerRunning && sendTimeLeft > 0
                  ? sendTimeLeft
                  : t("Отправить повторно")}
              </Button>
            ) : (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--color-accent-2)]"></div>
            )}
          </div>
        </div>
      )}
      <div className="mt-2">
        <LanguageSwitcher />
      </div>
    </div>
  );
};
