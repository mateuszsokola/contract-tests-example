import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Salary = ({ from, to }) => {
    function getCents(amount) {
        return amount % 100;
    }

    function getDollars(amount) {
        return amount / 100;
    }

    function reverseString(string) {
        return `${string}`.split('').reverse().join('');
    }

    function addSeparators(string) {
        return `${string}`.match(/[0-9]{1,3}/g).join('.');
    }

    function compose(...funcs) {
        return funcs.reduce(function (f, g) {
            return function (...args) {
                return f(g(...args));
            };
        });
    }

    function formatCents(cents) {
        if (cents < 10) {
            return `0${cents}`;
        }

        return `${cents}`;
    }

    function formatMoney(amountInCents) {
        const cents = getCents(amountInCents);
        const dollars = amountInCents - cents; // dollars = total amount - cents

        return formatDollars(dollars) + ',' + formatCents(cents);
    }
    
    // executed from the end: getDollars => reverseString => addSeparators => reverseString
    const formatDollars = compose(reverseString, addSeparators, reverseString, getDollars);

    return <span>{formatMoney(from)} &ndash; {formatMoney(to)} EUR</span>;
}

Salary.propTypes = {
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
}

export default Salary;