import ms from "ms";
import { DateTime } from "luxon";

export const START_DATE = DateTime.utc().minus({ weeks: 2 });

export const PAGE_SEGMENT_MS = ms("1d");
