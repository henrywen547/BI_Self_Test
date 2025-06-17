export function createSplitterTemplate(type) {
    switch (type) {
        case '1by1':
            return [
                { size: 100, content: 'Panel1', sidebarItem: {type: null, def: null}, setupComplete: false } // sidebarItem_type: "bar", "line", "table"...; sidebarItem_def: something about creating the corresponding component
            ];
        case '1by2':
            return [
                { size: 50, content: 'Panel1', sidebarItem: {type: null, def: null}, setupComplete: false },
                { size: 50, content: 'Panel2', sidebarItem: {type: null, def: null}, setupComplete: false }
            ];
        case '1by3':
            return [
                { size: 30, content: 'Panel1', sidebarItem: {type: null, def: null}, setupComplete: false },
                { size: 35, content: 'Panel2', sidebarItem: {type: null, def: null}, setupComplete: false },
                { size: 35, content: 'Panel3', sidebarItem: {type: null, def: null}, setupComplete: false }
            ];
        default:
            return [
                { size: 100, content: 'Panel1' }
            ];
    }
}