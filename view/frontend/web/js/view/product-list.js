define(
    [
        'ko',
        'uiComponent',
        'Magento_Customer/js/customer-data',
        'mage/translate',
        'Magento_Catalog/js/price-utils',
        'Magento_Checkout/js/model/quote',
    ],
    function (
        ko,
        Component,
        customer,
        $t,
        priceUtils,
        quote
    ) {
        'use strict';

        return Component.extend({
            isVisible: ko.observable(true),
            cart: customer.get('cart'),

            /**
             * @returns {*}
             */
            initialize: function () {
                this._super();
                return this;
            },

            /**
             * Method to return formatted price
             *
             * @param price
             * @returns {string}
             */
            getFormattedPrice: function (price) {
                return priceUtils.formatPrice(price, quote.getPriceFormat());
            }
        });
    }
);
