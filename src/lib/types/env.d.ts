declare global {
    namespace NodeJs {
        interface ProcessEnv {
            API_KEY: string;
            AUTH_DOMAIN: string;
            PROJECT_ID: string;
            STORAGE_BUCKET: string;
            MESSAGE_SENDER_ID: string;
            APP_ID: string;
        }
    }

    // namespace Bun {
    //     interface ProcessEnv {
    //         API_KEY: string;
    //         AUTH_DOMAIN: string;
    //         PROJECT_ID: string;
    //         STORAGE_BUCKET: string;
    //         MESSAGE_SENDER_ID: string;
    //         APP_ID: string;
    //     }
    // }
}

export {};