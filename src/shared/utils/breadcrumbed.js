//this is the breadcrumb utility function which will be used to handle the breadcrumb of the app
export const getBreadcrumbs = (pathname) => {
    const paths = pathname.split("/").filter((p) => p);
    const breadcrumbs = paths.map((p, i) => {
        const href = `/${paths.slice(0, i + 1).join("/")}`;
        return { href, label: p };
    });
    return breadcrumbs;
}