export function getMaxBirthDate(): Date {
  const now = new Date();
  let limit = new Date(now);

  limit.setFullYear(now.getFullYear() - 12);

  return limit;
}

function formatIsoDate(isoDate: string, includeTime: boolean): string {
  const splitDate = isoDate.split("T")[0].split("-");
  const formattedDate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;

  if (includeTime) {
    const splitTime = isoDate.split("T")[1].split(":");
    const formattedTime = `${splitTime[0]}:${splitTime[1]}`;
    return `${formattedDate} ${formattedTime}`;
  }

  return formattedDate;
}

export function formatDate(
  date: string,
  isIso: boolean = false,
  includeTime: boolean = false
): string {
  if (isIso) {
    return formatIsoDate(date, includeTime);
  }

  if (!includeTime) {
    const splitDate = date.split("-");

    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  }

  return "erro";
}

export function calcAge(date: string) {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "agora";
  if (diffMin < 60) return `há ${diffMin} minuto${diffMin > 1 ? "s" : ""}`;
  if (diffHour < 24) return `há ${diffHour} hora${diffHour > 1 ? "s" : ""}`;
  if (diffDay < 7) return `há ${diffDay} dia${diffDay > 1 ? "s" : ""}`;
  if (diffDay < 30) {
    const weeks = Math.floor(diffDay / 7);
    return `há ${weeks} semana${weeks > 1 ? "s" : ""}`;
  }
  if (diffDay < 365) {
    const months = Math.floor(diffDay / 30);
    return `há ${months} mês${months > 1 ? "es" : ""}`;
  }

  const years = Math.floor(diffDay / 365);
  return `há ${years} ano${years > 1 ? "s" : ""}`;
}
