export function getMaxBirthDate(): Date {
    const now = new Date()
    let limit = new Date(now)

    limit.setFullYear(now.getFullYear() - 12)

    return limit
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