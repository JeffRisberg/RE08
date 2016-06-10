import React from 'react'
import Category from './Category'
import Charity from './Charity'
import CharityList from './CharityList'

class Browse extends React.Component {
    constructor() {
        super();

        this.state = {charities: []};
        this.loadCharitiesFromServer = this.loadCharitiesFromServer.bind(this);
        this.loadCategoriesFromServer = this.loadCategoriesFromServer.bind(this);
    }

    render() {
        if (this.state.categories != null && this.state.categories.length > 0) {
            var categoryNodes = this.state.categories.map(function (category, index) {
                return (
                    <Category category={category} loadCharities={this.loadCharitiesFromServer} key={index}></Category>
                );
            });
            return (
                <div>{categoryNodes}</div>
            )
        }

        if (this.state.charities != null && this.state.charities.length > 0) {
            return (
                <div>
                    <table>
                        <tr>
                            <td width="20%">
                                Categories:
                            </td>
                            <td width="80%">
                                <CharityList charities={this.state.charities}/>
                            </td>
                        </tr>
                    </table>
                </div>
            );
        }
        return null;
    }

    componentDidMount() {
        this.loadCategoriesFromServer();

    }

    loadCategoriesFromServer() {
        var url = "/ws/charities/guide/categories";
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function (response) {
                this.setState({categories: response.data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    loadCharitiesFromServer(catId = "1") {
        console.log("loading charities for category " + catId)
        var url = "/ws/charities/categories/" + catId;
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({charities: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
}

export default Browse;