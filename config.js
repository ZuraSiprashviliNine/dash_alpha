
const env = process.env;

export const nodeEnv = env.NODE_ENV || 'dev';

export default {
    constants: {
        languages: 'languages',
        refLang: 'ref_lang',
        keywordsRef: 'keywords_ref',
        keywordsRes: 'keywords_res',
        divider: 'divider',
        active: 'active',
        empty: 'is empty',
        notEmail: 'is not valid email',
        itemsPerPage: 10,
        page: "page",
        total: "total",
        perPage: "per_page",
        category: 'category',
        all: 'all',
        front: 'front',
        like: 'like',
        id: 'id',
        unlike: 'unlike',
        ident: 'ident',
        isBack: 'isBack',
        slag: 'slag',
        view: 'view'
    },
    port: env.PORT || 3000,
    host: env.HOST || '127.0.0.1',
    get serverURL(){
        return `http://${this.host}:${this.port}`;
    }
}