
const env = process.env;

export const nodeEnv = env.NODE_ENV || 'dev';

export default {
    port: env.PORT || 3000,
    host: env.HOST || '127.0.0.1',
    get serverURL(){
        return `http://${this.host}:${this.propt}`;
    }
}