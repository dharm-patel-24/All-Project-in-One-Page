const express = require('express');

const router = express.Router();

const { homePage, timeConverter, registrationForm, registrationFormSubmit, activated, passwordSubmit, login, homePagePost, homePageGet, forgot, email, expire, regenerated, authentication, logout } = require('../controller/controller');

const { cssOne, csstwo, cssthree } = require('../controller/css_tasks/controller');

const { dynamicTable, kukuCube, ticTacToe, allEvents } = require('../controller/js_task/controller');

const pagination = require('../controller/pagination/controller');

const attendance_report = require('../controller/attendance_report/controller');

const { result_table, one_std_result } = require('../controller/result_table/controller');

const { rglr_search, get_data_rglr_search } = require('../controller/rglr_search/controller');

const filter = require('../controller/filter/controller');

const { searchById, getSearchedDataById, searchByIdShowMore, searchbyANDOR } = require('../controller/search_by_id/controller');

const { delimiterSearch, delimiterSearchResult } = require('../controller/delimiter_search/controller');

const { formValidation, formValidationUpdate, formValidationUpdateData, formValidationInsert } = require('../controller/form_validation/controller');

const { fetchPosts, fetchShowMore } = require('../controller/fetch_api/controller');

const { stepForm, state, stepFormSubmit, getDataStepForm, updateStepForm } = require('../controller/step_form/controller');

router.get('/ehys-css-task-1', authentication, cssOne);

router.get('/awanHoster-css-task-2', authentication, csstwo);

router.get('/hireX-css-task-3', authentication, cssthree);

router.get('/homePage', authentication, homePage);

router.get('/dynamic-table', authentication, dynamicTable);

router.get('/kuku-cube', authentication, kukuCube);

router.get('/tic-tac-toe', authentication, ticTacToe);

router.get('/all-events', authentication, allEvents);

router.get('/pagination', authentication, pagination);

router.get('/attendance-report', authentication, attendance_report);

router.get('/result-report', authentication, result_table);

router.get('/one-std-result', authentication, one_std_result);

router.get('/rglr-search', authentication, rglr_search);

router.get('/rglr-search-data', authentication, get_data_rglr_search);

router.post('/rglr-search-data', authentication, get_data_rglr_search);

router.get('/filter', authentication, filter);

router.get('/search-by-id', authentication, searchById);

router.post('/get-searched-data-by-id', authentication, getSearchedDataById);

router.get('/search-by-id-showMore', authentication, searchByIdShowMore);

router.post('/search-by-AND-OR', authentication, searchbyANDOR);

router.get('/delimiter-search', authentication, delimiterSearch);

router.post('/delimiter-search-result', authentication, delimiterSearchResult);

router.get('/form-validation', authentication, formValidation);

router.get('/form-validation-update/:id', authentication, formValidationUpdate);

router.post('/form-validation-update/:id', authentication, formValidationUpdateData);

router.post('/submit', authentication, formValidationInsert);

router.get('/posts-fetch', authentication, fetchPosts);

router.get('/posts-fetch-showMore/:id', authentication, fetchShowMore);

router.get('/stepForm', authentication, stepForm);

router.get('/getAllStates', authentication, state);

router.post('/submitstepForm', authentication, stepFormSubmit);

router.get('/stepForm-update/:id', authentication, getDataStepForm);

router.post('/stepForm-update/:id', authentication, updateStepForm);

router.get('/timeZone-converter', authentication, timeConverter);

router.get('/', registrationForm);

router.post('/registration-form-submit', registrationFormSubmit);

router.get('/activated/:id', activated);

router.post('/passwordSubmit', passwordSubmit);

router.get('/login', login);

router.post('/homePage', homePagePost);

router.get('/homePage', homePageGet);

router.get('/forgot', forgot);

router.post('/email', email);

router.get('/expire', expire);

router.get('/regenerated', regenerated);

router.get('/logout', logout);

module.exports = router;