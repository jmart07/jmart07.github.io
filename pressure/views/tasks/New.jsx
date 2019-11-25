const React = require('react');
const AppLayout = require('../layout/AppLayout.jsx')

class New extends React.Component {
    render() {
        return(
            <AppLayout title="Add a new task">
                <form action="/tasks" method="POST">
                    <div className="field">
                        <label className="field">Name</label>
                        <div className="control">
                            <input type="text" name="name"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="field">Due Date</label>
                        <div className="control">
                            <input type="date" name="dueDate"/>
                        </div>
                    </div>
                    <div className="control">
                        <input type="submit" name="" value="Create item"/>
                    </div>
                </form>
            </AppLayout>
        );
    }
}

module.exports = New;