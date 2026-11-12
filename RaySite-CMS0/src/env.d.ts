import type { D1Database } from "@cloudflare/workers-types";

export interface CloudflareBindings {
    RAYSITE_CMS0_DB: D1Database;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
}
