const dynamicTable = (req, res) => {
    res.render('dynamicTable');
}

const kukuCube = (req, res) => {
    res.render('kukuCube');
}

const ticTacToe = (req, res) => {
    res.render('ticTacToe');
}

const allEvents = (req, res) => {
    res.render('allEvents');
}

module.exports = {dynamicTable, kukuCube, ticTacToe, allEvents}