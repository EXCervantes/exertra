import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const formatTime = (totalTime) => {
    return dayjs.duration(totalTime * 1000, "milliseconds").format("HH:mm:ss");
};