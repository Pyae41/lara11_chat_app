export const formatMessageDate = (date, type = "long") => {
    const now = new Date();
    const inputDate = new Date(date);

    if (isToday(inputDate)) {
        return inputDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    else if (isYesterday(inputDate)) {
        if (type === 'short') return "Yesterday";
        return "Yesterday" + inputDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    else if (inputDate.getFullYear() === now.getFullYear()) {
        return inputDate.toLocaleDateString([], {
            day: "2-digit",
            month: "short"
        });
    }
    else {
        return inputDate.toLocaleDateString();
    }
}

export const isToday = (date) => {
    const today = new Date();

    return today.getDate() === date.getDate() &&
        today.getMonth() === date.getMonth() &&
        today.getFullYear() === date.getFullYear();
}

export const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)

    return yesterday.getDate() === date.getDate() &&
        yesterday.getMonth() === date.getMonth() &&
        yesterday.getFullYear() === date.getFullYear();
}
