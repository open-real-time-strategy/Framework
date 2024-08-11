export type View = {
    kind: "menu" | "game";
    entities: Entity[];
}

export type Entity = {};

/**
 * @description A list of views that make up a flow.
 * @type {ViewFlow}
 */
export type ViewFlow = {
    views: View[];
};

