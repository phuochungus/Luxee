declare module "cartesian" {
    /**
     * Creates cartesian product of the provided properties
     *
     * @param   {object|array} list - list of (array) properties or array of arrays
     * @returns {array} all the combinations of the properties
     */
    function cartesian(list: object | any[]): any[];

    export = cartesian;
}
