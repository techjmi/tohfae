//this is the seo constant file for this web project(only default seo constant and default json ld)
import { website_name, main_url } from "../../shared/constant/global-constant";
//default seo constant for this web project
export const default_seo_constant = {
    title: `${website_name} -Design Personalized Gifts for Every Occasion, T-Shirts, Mugs, and More!`,
    description: `${website_name} is a personalized gift design platform that allows you to create custom t-shirts, mugs, and more for any occasion. Choose from a variety of templates and customize with your own text and images.`,
    keywords: [`${website_name}`, 'Personalized Gifts', 'Custom T-Shirts', 'Custom Mugs', 'Gift Design', 'Occasion Gifts', 'Custom Gifts', 'Online Gift Design', 'T-Shirt Design', 'Mug Design'],
    image: '/brand/logo.png',
    canonical: main_url,
    type: 'website',
    author: `${website_name}`,
}
