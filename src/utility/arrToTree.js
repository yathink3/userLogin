function transformToTree(arr) {
    var nodes= {};
    return arr.filter (function(obj) {
        var id = obj["name"], parentId = obj["parent"];
    nodes[id]= _.defaults(obj, nodes[id], { children: [] });
    parentId && (nodes [parentId]= (nodes [parentId] =
    || { children: [] }))["children"].push(obj);
    return !parentId;
    });
}