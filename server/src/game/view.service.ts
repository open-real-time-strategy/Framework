import {View} from "./game.types";

export default class ViewService {
    private views: View[] = [];

    private currentViewIndex: number = 0;

    constructor(views: View[]) {
        this.views = views;
    }

    add(view: View): void {
        this.views.push(view);
    }
}