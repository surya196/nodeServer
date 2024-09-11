const express = require('express');
const router = express.Router();
const fileUploadRouter = require('./FileUploadRoute');
const weatherRoute = require('./weatherRouter');

export class Route {
    constructor() {
        const defaultRoutes = [
            {
                path: '/file',
                route: fileUploadRouter,
            },
            {
                path: '/weather',
                route: weatherRoute,
            },
        ];

        defaultRoutes.forEach((route) => {
            router.use(route.path, route.route);
        });
    }
}