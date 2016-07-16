var Focus = Focus || {};

Focus.Items = [{
            type: 'Feature Article',
            title: 'From Ranching to Fishing – the Cultural Landscape of the Northern Pacific Coast of Baja California, Mexico',
            author: 'Antoinette WinklerPrins, Pablo Alvarez, Gerardo Bocco, Ileana Espejel',
            description: '',
            thumbnail: '../../articles/baja/img/fig1.jpg',
            url: '../../articles/baja/index.html',
            location: [{
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-113.77222, 27.33072]
                }
            }]
        }, {
            type: 'Photo Essay',
            title: 'Many Destinations, One Place Called Home:  Migration and Livelihood for Rural Bolivians',
            author: 'Marie Price',
            description: '',
            thumbnail: '../../photoessays/bolivia/img/figure1.jpg',
            url: '../../photoessays/bolivia/index.html',
            location: [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-65.852255, -17.537959]
                }
            }]
        }, {
            type: 'Geo Quiz',
            title: 'Quiz One:  Explorers',
            author: 'Wesley Reisser',
            description: '',
            thumbnail: '../../quizzes/one/img/agsglobe.png',
            url: '../../quizzes/one/index.html',
            location: []
        }];

Focus.Models = Focus.Models || {};
Focus.Collections = Focus.Collections || {};
Focus.Views = Focus.Views || {};

Focus.Models.ItemModel = Backbone.Model.extend({

});

Focus.Collections.ItemCollection = Backbone.Collection.extend({
   model: Focus.Models.ItemModel
});

Focus.Views.MenuItemView = Backbone.View.extend({
    className: '', //'row',
    tagName: 'div',
    template: _.template($('#menu-item-template').html()),
    initialize: function (options) {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});

Focus.Views.MenuItemsView = Backbone.View.extend({
    className: 'row', //'col-12 col-sm-12',
    template: _.template($('#menu-items-template').html()),
    initialize: function (options) {
        this.listenTo(this.collection, 'add', this.addItem);
    },
    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
    addItem: function (model) {
        var view = new Focus.Views.MenuItemView({
            model: model
        });
        this.$el.find('.items').append(view.render().el);
        return this;
    }
});

Focus.Views.MenuView = Backbone.View.extend({
    el: $('#menu'),
    initialize: function () {
        this.initHamburger();
    },
    initHamburger: function () {
        var beginAC = 80,
            endAC = 320,
            beginB = 80,
            endB = 320;

        function inAC(s) {
            s.draw('80% - 240', '80%', 0.3, {
                delay: 0.1,
                callback: function() {
                    inAC2(s)
                }
            });
        }

        function inAC2(s) {
            s.draw('100% - 545', '100% - 305', 0.6, {
                easing: ease.ease('elastic-out', 1, 0.3)
            });
        }

        function inB(s) {
            s.draw(beginB - 60, endB + 60, 0.1, {
                callback: function() {
                    inB2(s)
                }
            });
        }

        function inB2(s) {
            s.draw(beginB + 120, endB - 120, 0.3, {
                easing: ease.ease('bounce-out', 1, 0.3)
            });
        }

        /* Out animations (to burger icon) */

        function outAC(s) {
            s.draw('90% - 240', '90%', 0.1, {
                easing: ease.ease('elastic-in', 1, 0.3),
                callback: function() {
                    outAC2(s)
                }
            });
        }

        function outAC2(s) {
            s.draw('20% - 240', '20%', 0.3, {
                callback: function() {
                    outAC3(s)
                }
            });
        }

        function outAC3(s) {
            s.draw(beginAC, endAC, 0.7, {
                easing: ease.ease('elastic-out', 1, 0.3)
            });
        }

        function outB(s) {
            s.draw(beginB, endB, 0.7, {
                delay: 0.1,
                easing: ease.ease('elastic-out', 2, 0.4)
            });
        }

        /* Awesome burger default */

        function addScale(m) {
            m.className = 'menu-icon-wrapper scaled';
        }

        function removeScale(m) {
            m.className = 'menu-icon-wrapper';
        }

        /* Awesome burger scaled */

        var pathD = document.getElementById('pathD'),
            pathE = document.getElementById('pathE'),
            pathF = document.getElementById('pathF'),
            segmentD = new Segment(pathD, beginAC, endAC),
            segmentE = new Segment(pathE, beginB, endB),
            segmentF = new Segment(pathF, beginAC, endAC),
            wrapper2 = document.getElementById('menu-icon-wrapper2'),
            trigger2 = document.getElementById('menu-icon-trigger2'),
            toCloseIcon2 = true,
            dummy2 = document.getElementById('dummy2');

        wrapper2.style.visibility = 'visible';

        trigger2.onclick = function() {
            addScale(wrapper2);
            if (toCloseIcon2) {
                inAC(segmentD);
                inB(segmentE);
                inAC(segmentF);
            } else {
                outAC(segmentD);
                outB(segmentE);
                outAC(segmentF);
            }
            toCloseIcon2 = !toCloseIcon2;
            setTimeout(function() {
                removeScale(wrapper2)
            }, 450);

            $('#main-nav').toggleClass('expanded');
        };
    },
    render: function () {
        var me = this;
        /*
        _.each(Focus.Items, function (value, key) {
            var view = new Focus.Views.MenuItemsView({
                model: new Backbone.Model({
                   text: value.text
                }),
                collection: new Focus.Collections.ItemCollection()
            });
            me.$el.append(view.render().el);
            _.each(value.items, function (item) {
               item.type = value.text;
            });
            view.collection.add(value.items);
        });
        */
        var view = new Focus.Views.MenuItemsView({
            model: new Backbone.Model({
                text: 'Publications'
            }),
            collection: new Focus.Collections.ItemCollection()
        });
        me.$el.append(view.render().el);
        view.collection.add(Focus.Items);
        return this;
    }
});

var menuView = new Focus.Views.MenuView();
menuView.render();

var $footer = $('.footer-row');
var yearText = 2016;
var currentYear = new Date().getFullYear();

yearText = currentYear > yearText ? yearText + '-' + currentYear : yearText;
$footer.html('<div class="col-lg-6">© ' + yearText + ' <a href="//americangeo.org" target="_blank">American Geographical Society</a>.  All Rights Reserved.</div><div class="col-lg-6"><span class="pull-right">Site design by <a href="https://github.com/sfairgrieve" target="_blank">Scott Fairgrieve</a>, <a href="//www.thehumangeo.com" target="_blank">HumanGeo</a></span></div>');
