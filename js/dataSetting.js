window.COOKIE_DOMAIN = document.domain;
window.AJAXORI = '';
$(function() {
    requirejs.config({
        baseUrl: (window.location.origin||(window.location.protocol + "//" +window.location.host))+"/shoppingmobilestatic",
        paths: {
            "dataConfig": "js/dataConfig",
            "bsCommon": "js/businessCommon",
            "comUtil": "js/commonUtil",
            "flyPlug": "js/fly.plug",

            "login": "js/login",
            "index": "js/index",
            "category": "js/category",
            "search": "js/search",
            "product": "js/product",
            "cart": "js/cart",
            "user": "js/user",
            "orderList": "js/orderList",
            "orderDetail": "js/orderDetail",
            "userManage": "js/userManage",
            "checkPhone": "js/checkPhone",
            "modifyphone": "js/modifyphone",
            "modifypwd": "js/modifypwd",
            "address": "js/address",
            "addressEdit": "js/addressEdit",
            "aboutUs": "js/aboutUs"
        },
        waitSeconds: 0
    });
})