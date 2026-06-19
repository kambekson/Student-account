import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { notifyError } from "@/shared/ui/Toasts/options";
import { InformationSystemError, subcodeMap } from "@/entities/Common";
import { UserAPI } from "@/entities/User";
import { addSubDomainToUrl } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/shared/ui/Switcher/LanguageSwitcher";
import { RECOVERY_REDIRECT_URL } from "@/shared/api/base";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,25}$/;

const useValidRegex = (
  value: string,
  re: RegExp,
  textError: string,
  setTextError: (value: string) => void
) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setTextError(re.test(value) ? "" : textError);
  }, [value, re, textError, setTextError]);
};

const useStringsMatch = (
  value1: string,
  value2: string,
  textError: string,
  setTextError: (value: string) => void
) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setTextError(value1 === value2 ? "" : textError);
  }, [value1, value2, textError, setTextError]);
};

export interface RecoveryProps {
  token: string;
}

export const RecoveryPage: React.FC<RecoveryProps> = (props) => {
  const [passwordTextError, setPasswordTextError] = useState("");
  const [repeatedPasswordTextError, setRepeatedPasswordTextError] =
    useState("");

  const [isDisabled, setDisabled] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { t } = useTranslation();

  useValidRegex(
    password,
    passwordRegex,
    t("Некорректный пароль"),
    setPasswordTextError
  );
  useStringsMatch(
    password,
    repeatedPassword,
    t("Пароли должны совпадать"),
    setRepeatedPasswordTextError
  );

  const handleButtonClick = async () => {
    if (passwordTextError || repeatedPasswordTextError) {
      return;
    }

    setDisabled(true);

    try {
      await UserAPI.recoveryPassword({
        token: props.token,
        newPassword: password,
      });
      window.location.replace(addSubDomainToUrl(RECOVERY_REDIRECT_URL));
    } catch (e: unknown) {
      let msg: string;
      if (e instanceof InformationSystemError) {
        msg = e.subcode ? subcodeMap[e.subcode] : e.message;

        if (e.code >= 500) {
          notifyError(`${t("Не удалось сменить пароль")}.`, t(msg));
        } else {
          setPasswordTextError(msg);
        }
      } else {
        notifyError(
          `${t("Не удалось сменить пароль")}.`,
          t("Неизвестная ошибка")
        );
      }
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-[400px]">
      <div className="text-xl font-bold text-[var(--color-text)]">{t("Восстановление пароля")}</div>
      <p className="text-xs text-gray-500 text-center px-4">
        {t(
          "Пароль должен содержать от 8 до 25 символов, иметь минимум одну цифру, одну заглавную и одну строчную латинские буквы"
        )}
      </p>

      <div className="w-full flex flex-col gap-1.5 relative">
        <label className="text-xs font-semibold text-gray-500">{t("Пароль")} *</label>
        <div className="relative flex items-center">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            disabled={isDisabled}
            className={`h-11 pr-10 ${passwordTextError ? "border-[var(--color-alert)] focus-visible:ring-[var(--color-alert)]" : ""}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 p-1 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {passwordTextError && (
          <span className="text-xs text-[var(--color-alert)] font-medium mt-0.5">{passwordTextError}</span>
        )}
      </div>

      <div className="w-full flex flex-col gap-1.5 relative">
        <label className="text-xs font-semibold text-gray-500">{t("Повторите пароль")} *</label>
        <div className="relative flex items-center">
          <Input
            type={showPassword ? "text" : "password"}
            value={repeatedPassword}
            onChange={(e) => {
              setRepeatedPassword(e.target.value);
            }}
            disabled={isDisabled}
            className={`h-11 pr-10 ${repeatedPasswordTextError ? "border-[var(--color-alert)] focus-visible:ring-[var(--color-alert)]" : ""}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 p-1 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {repeatedPasswordTextError && (
          <span className="text-xs text-[var(--color-alert)] font-medium mt-0.5">{repeatedPasswordTextError}</span>
        )}
      </div>

      {!isDisabled ? (
        <Button
          className="w-full h-11 bg-[var(--color-accent-2)] hover:bg-[var(--color-accent-2)]/90 text-white font-semibold rounded-xl shadow-md transition-all active:scale-[0.98]"
          onClick={handleButtonClick}
          disabled={isDisabled}
        >
          {t("Продолжить")}
        </Button>
      ) : (
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent-2)]"></div>
      )}
      <div className="mt-2">
        <LanguageSwitcher />
      </div>
    </div>
  );
};
