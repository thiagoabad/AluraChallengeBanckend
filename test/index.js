const expenses = require( './suites/expenses')
const incomes = require('./suites/incomes')
const resume = require('./suites/resume')

describe('Api', function() {
  describe('Expenses', expenses.bind(this));
  describe('Incomes', incomes.bind(this));
  describe('Resume', resume.bind(this));
});