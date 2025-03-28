export const formatTimeAgo  = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffSeconds < 60) return 'Justo ahora';
    if (diffSeconds < 3600) return `Hace ${Math.floor(diffSeconds / 60)} min`;
    if (diffSeconds < 86400) return `Hace ${Math.floor(diffSeconds / 3600)} h`;
    const diffDays = Math.floor(diffSeconds / 86400);
    return `Hace ${diffDays} ${ diffDays === 1 ? "día" : "días" }`;
  }
  