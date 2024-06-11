import { parseISO, format, addHours } from 'date-fns';

const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    const dateUTC2 = addHours(date, 2);
    return format( dateUTC2, 'yyyy-MM-dd HH:mm:ss');
};

export default formatDate;