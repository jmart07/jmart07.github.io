const React = require('react');
const AppLayout = require('../layout/AppLayout.jsx')

class New extends React.Component {
    render() {
        return(
            <AppLayout title="Add a new task">
                <form action="/tasks" method="POST">
                    <div className="">
                        <label className="">Name</label>
                        <div className="">
                            <input type="text" name="name"/>
                        </div>
                    </div>
                    <div className="">
                        <label className="">Due Date</label>
                        <div className="">
                            <input type="date" name="dueDate"/>
                        </div>
                    </div>
                    <div className="">
                        <input type="submit" name="" value="Create item"/>
                    </div>
                </form>
            </AppLayout>
        );
    }
}

module.exports = New;