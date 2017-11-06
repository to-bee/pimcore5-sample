/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Enterprise License (PEL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PEL
 */

pimcore.registerNS("pimcore.element.history");
pimcore.element.history = Class.create({


    initialize:function () {
        this.getTabPanel();
    },

    activate:function () {
        var tabPanel = Ext.getCmp("pimcore_panel_tabs");
        tabPanel.setActiveItem("element_history");
    },

    getTabPanel:function () {
        if (!this.panel) {
            this.panel = new Ext.Panel({
                id:"element_history",
                title:t("element_history"),
                border:false,
                layout:"fit",
                iconCls:"pimcore_icon_schedule",
                closable:true
            });

            this.panel.on("destroy", function () {
                pimcore.globalmanager.remove("element_history");
            }.bind(this));

            var history = pimcore.helpers.getHistory();
            var storeValues = [];
            for(var i=0; i < history.length; i++) {
                var item = history[i];
                var time = new Date(item.time);
                var name = "";
                if (item.name) {
                    name = item.name;
                }

                storeValues.push([name, item.type, item.id, time]);
            }

            this.store =  new Ext.data.ArrayStore({
                fields: [ "name", "type", "id", "time"],
                data: storeValues
            });


            this.resultpanel = Ext.create('Ext.grid.Panel', {
                store:this.store,
                trackMouseOver:true,
                disableSelection:true,
                autoScroll:true,

                columns:[
                        {
                            hideable: false,
                            xtype: 'actioncolumn',
                            width: 30,
                            items: [
                                {
                                    tooltip: t('open'),
                                    icon: "/pimcore/static6/img/flat-color-icons/cursor.svg",
                                    handler: function (grid, rowIndex) {
                                        var data = grid.getStore().getAt(rowIndex).data;
                                        pimcore.helpers.openElement(data.id, data.type);

                                    }.bind(this)
                                    ,
                                    getClass: function(value,metadata,record) {

                                        return 'x-grid-center-icon';

                                    }
                                }
                            ]
                        },
                        {
                            header:t("name"),
                            dataIndex:'name',
                            flex:500,
                            align:'left',
                            sortable:true
                        }

                        ,
                        {
                            header:t("type"),
                            dataIndex:'type',
                            flex:80,
                            align:'left',
                            sortable:true
                        }
                        ,
                        {
                            header:t("id"),
                            dataIndex:'id',
                            flex:80,
                            align:'left',
                            sortable:true
                        }
                        ,
                        {
                            header:t("time"),
                            dataIndex:'time',
                            flex:220,
                            align:'left',
                            sortable:true
                        }
                    ]
                ,

                listeners: {
                    rowclick : function(table, record, tr, rowIndex, e, eOpts ) {
                        var data = record.data;
                        pimcore.helpers.openElement(data.id, data.type);
                    }.bind(this)
                },
                viewConfig: {
                    forceFit: true
                }
            });


            this.panel.add(this.resultpanel);
            var tabPanel = Ext.getCmp("pimcore_panel_tabs");
            tabPanel.add(this.panel);
            tabPanel.setActiveItem("element_history");

            pimcore.layout.refresh();
        }
        return this.panel;
    }
});
