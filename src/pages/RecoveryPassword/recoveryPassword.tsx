import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useRef, useState } from "react";
import { notifyError } from "@/shared/ui/Toasts/options";
import { InformationSystemError, subcodeMap } from "@/entities/Common";
import { UserAPI } from "@/entities/User";
import { addSubDomainToUrl, getSubdomain } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/shared/ui/Switcher/LanguageSwitcher";
import { RECOVERY_REDIRECT_URL } from "@/shared/api/base";

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
  }, [value]);
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
  }, [value1, value2]);
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={"100%"}
      flexDirection="column"
      gap="1rem"
    >
      <Tooltip
        title={t(
          "Пароль должен содержать от 8 до 25 символов, иметь минимум одну цифру, одну заглавную и одну строчную латинские буквы"
        )}
        placement="top"
        arrow
      >
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label={`${t("Пароль")} *`}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          error={!!passwordTextError}
          helperText={passwordTextError}
          disabled={isDisabled}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            },
          }}
        />
      </Tooltip>
      <TextField
        fullWidth
        type={showPassword ? "text" : "password"}
        label={`${t("Повторите пароль")} *`}
        value={repeatedPassword}
        onChange={(e) => {
          setRepeatedPassword(e.target.value);
        }}
        error={!!repeatedPasswordTextError}
        helperText={repeatedPasswordTextError}
        disabled={isDisabled}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            ),
          },
        }}
      />
      {!isDisabled ? (
        <Button
          fullWidth
          variant="contained"
          onClick={handleButtonClick}
          disabled={isDisabled}
        >
          {t("Продолжить")}
        </Button>
      ) : (
        <CircularProgress />
      )}
      <LanguageSwitcher />
    </Box>
  );
};
