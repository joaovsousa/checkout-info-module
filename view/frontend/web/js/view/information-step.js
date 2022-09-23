define(
    [
        'ko',
        'uiComponent',
        'underscore',
        'Magento_Checkout/js/model/step-navigator',
        'Magento_Customer/js/model/customer',
        'mage/translate',
    ],
    function (
        ko,
        Component,
        _,
        stepNavigator,
        customer,
        $t
    ) {
        'use strict';

        return Component.extend({
            isVisible: ko.observable(true),
            isLoggedIn: customer.isLoggedIn(),
            stepCode: 'informationStep',
            stepTitle: $t('Review Info'),

            /**
             *
             * @returns {*}
             */
            initialize: function () {
                this._super();
                stepNavigator.registerStep(
                    this.stepCode,
                    null,
                    this.stepTitle,
                    this.isVisible,
                    _.bind(this.navigate, this),
                    this.sortOrder
                );

                return this;
            },

            /**
             * Navigator change hash handler.
             *
             * @param {Object} step - navigation step
             */
            navigate: function (step) {
                step && step.isVisible(true);
            },

            /**
             * @returns void
             */
            navigateToNextStep: function () {
                stepNavigator.next();
            },

            /**
             * @returns void
             */
            navigateToPreviousStep: function () {
                let activeIndex = 0,
                    steps = stepNavigator.steps(),
                    code;

                steps.sort(stepNavigator.sortItems).forEach(function (element, index) {
                    if (element.isVisible()) {
                        element.isVisible(false);
                        activeIndex = index;
                    }
                });

                code = steps[activeIndex - 1].code;
                steps[activeIndex - 1].isVisible(true);
                stepNavigator.setHash(code);
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        });
    }
);
