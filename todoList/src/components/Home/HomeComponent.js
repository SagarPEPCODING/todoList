import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./home.css";
import AddIcon from "@material-ui/icons/Add";

export class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      search: "",
      searchItem: false,
      searchedItemIs: [],
      addnewTask: false,
      taskPostValue: "",
      editTaskClicked: false,
      deleteTaskClicked: false,
      editTaskId: "",
    };
  }

  componentDidMount = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:4000/api/v1/task/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let tasksList = JSON.parse(result);
        this.setState({ tasks: tasksList });
      })
      .catch((error) => console.log("error", error));
  };

  addNewTask = () => {
    this.setState({ addnewTask: !this.state.addnewTask });
  };

  editClicked = (event) => {
    this.setState({
      editTaskClicked: !this.state.editTaskClicked,
      editTaskId: event.target.getAttribute("id"),
    });
  };

  deleteClicked = (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://localhost:4000/api/v1/task/${event.target.getAttribute("id")}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  onChangeSearch = (event) => {
    this.setState({ search: event.target.value });
  };

  submit = (event) => {
    event.preventDefault();
    let id = 0;
    if (this.state.search.length !== 0) {
      id = parseInt(this.state.search);
    }
    let searchedItem = this.state.tasks.filter((item) => {
      if (item.id === id) {
        return item;
      }
    });
    this.setState({ searchItem: true, searchedItemIs: searchedItem });
    if (this.state.search.length === 0) {
      this.setState({ searchItem: false });
    }
  };

  addnewTaskBtnClicked = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      task: this.state.taskPostValue,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:4000/api/v1/task/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        this.setState({ addnewTask: false, taskPostValue: "" });
      })
      .catch((error) => console.log("error", error));
  };

  taskChange = (event) => {
    this.setState({ taskPostValue: event.target.value });
  };

  editTaskBtnClicked = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      task: this.state.taskPostValue,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://localhost:4000/api/v1/task/${this.state.editTaskId}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        this.setState({
          taskPostValue: "",
          editTaskClicked: false,
          editTaskId: "",
        });
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div className="home__">
        <div className="container">
          {/* search bar */}
          <div className="search_bar alignitems_justify widthauto">
            <div className="searchcontainer margin-top10">
              <div className="searchbar addnewtask taskcontainer">
                <div class="row justify-content-center">
                  <div class="col-12 col-md-10 col-lg-8">
                    <form class="card card-sm" onSubmit={this.submit}>
                      <div class="card-body row no-gutters align-items-center">
                        <div class="col-auto">
                          <i class="fas fa-search h4 text-body"></i>
                        </div>
                        <div class="col">
                          <input
                            class="form-control form-control-lg form-control-borderless"
                            type="search"
                            placeholder="Search tasks here"
                            onChange={this.onChangeSearch}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* add new task */}
          <div className="addnewtask alignitems_justify widthauto">
            <div className="addnewtask_container margin-top10">
              <div className="display_flex align-items-center">
                <div className="add_icon" onClick={this.addNewTask}>
                  <AddIcon></AddIcon>
                </div>
                <div className="content fontsize10 ">{"  Add new Task "}</div>
              </div>
            </div>
          </div>

          {this.state.addnewTask ? (
            <div className="container">
              <label>Task:-</label>
              <input
                placeholder="enter task name"
                onChange={this.taskChange}
              ></input>
              <button
                className="btn margin__"
                type="button"
                onClick={this.addnewTaskBtnClicked}
              >
                Post Task
              </button>
            </div>
          ) : null}

          {this.state.editTaskClicked ? (
            <div className="container">
              <label>Task:-</label>
              <input
                placeholder="enter task name"
                onChange={this.taskChange}
              ></input>
              <button
                className="btn margin__"
                type="button"
                onClick={this.editTaskBtnClicked}
              >
                Edit Task
              </button>
            </div>
          ) : null}

          {/* tasklist */}
          <div className="tasklist alignitems_justify widthauto">
            {!this.state.searchItem ? (
              <div className="min-height400px">
                {this.state.tasks.map((item, index) => {
                  return (
                    <div className="tasklistcontainer margin-top10">
                      <div className="taskitem display_flex align-items-center">
                        <div
                          className="id_ fontWeight500"
                          style={{     width: 'calc(100% - 90%)' }}
                        >
                          {item.id}.
                        </div>
                        <div
                          className="task_name text-align-left fontWeight500"
                          style={{ width: 'calc(100% - 50%)' }}
                        >
                          {item.task}
                        </div>
                        <div
                          className="edit__ fontWeight500"
                          style={{ width: 'calc(100% - 80%)' }}
                          onClick={this.editClicked}
                          id={item._id}
                        >
                          Edit
                        </div>

                        <div
                          className="delete fontWeight500"
                          style={{ width: 'calc(100% - 80%)' }}
                          onClick={this.deleteClicked}
                          id={item._id}
                        >
                          Delete
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="min-height400px">
                {this.state.searchedItemIs.map((item, index) => {
                  return (
                    <div className="tasklistcontainer margin-top10" key={index}>
                      <div className="taskitem display_flex align-items-center">
                        <div
                          className="id_ fontWeight500"
                          style={{ width: "40px" }}
                        >
                          {item.id}.
                        </div>
                        <div
                          className="task_name text-align-left fontWeight500"
                          style={{ width: "250px" }}
                        >
                          {item.task}
                        </div>
                        <div
                          className="edit__ fontWeight500"
                          style={{ width: "50px" }}
                          onClick={this.editClicked}
                          id={item._id}
                        >
                          edit
                        </div>

                        <div
                          className="delete fontWeight500"
                          style={{ width: "50px" }}
                          onClick={this.deleteClicked}
                          id={item._id}
                        >
                          delete
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
