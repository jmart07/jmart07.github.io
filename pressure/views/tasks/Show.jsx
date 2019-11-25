const React = require('react');
const AppLayout = require('../layout/AppLayout.jsx')

class Show extends React.Component {
    render() {
        return(
            <AppLayout title={ this.props.task.name}>
                <div>
                    {this.props.task.dueDate.toLocaleDateString() }
                </div>
            </AppLayout>
        );
    }
}

module.exports = Show;