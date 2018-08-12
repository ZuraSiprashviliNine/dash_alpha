

export function getPageSlag(page){
    return page.indexOf('/', 1) !== -1 ? page.substring(0, page.indexOf('/', 1)) : page;
}