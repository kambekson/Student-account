import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = (token: string): string | null => {
  try {
    const decoded: { sub: string } = jwtDecode(token);
    return decoded.sub;
  } catch (e) {
    console.error("Failed to decode token", e);
    return null;
  }
};

export function checkIsTokenExpired(exp: number): boolean {
  if (Date.now() <= exp * 1000) {
    return false;
  }
  return true;
}

export function getSubdomain(): string | undefined {
  const hostname = window.location.hostname;

  const domainParts = hostname.split(".");

  const length = domainParts[1] === "localhost" ? 2 : 3;
  if (domainParts.length >= length) {
    return domainParts[0];
  }

  return undefined;
}

export function addSubDomainToUrl(
  stringUrl: string,
  subDomain?: string
): string {
  const domain = subDomain ? subDomain : getSubdomain();
  const url = new URL(stringUrl);

  const hostParts = url.hostname.split(".");
  hostParts.unshift(domain ?? "");
  url.hostname = hostParts.join(".");

  return url.toString();
}

export const getFileExtension = (filename: string): string | null => {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop()?.toLowerCase() || null : null;
};
