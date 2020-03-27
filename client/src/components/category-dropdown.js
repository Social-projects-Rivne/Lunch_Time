import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import '../style/category-dropdown.css';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

class CategoryDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selected: this.props.categories, // here we get values from props (now empty, then updated values)
    };
    this.onVisibleChange = this.onVisibleChange.bind(this);
  }

  onVisibleChange(visible) {
    this.setState({
      visible: visible,
    });
  }

  saveSelected(selectedKeys) {
    this.setState({
      selected: selectedKeys,
    });
  }

  addCategories() {
    this.props.addCategories(this.state.selected); // here props are updated
  }

  confirm() {
    const { selected } = this.state;
    this.addCategories(); // here props should be updated
    const { homePath, path } = this.props;
    if (selected.length > 0) {
      this.props.onApply(path + selected);
    } else {
      this.props.onApply(homePath);
    }
    this.onVisibleChange(false);
  }

  render() {
    const { visible } = this.state;
    const { items } = this.props;
    const menu = (
      <Menu
        multiple
        onSelect={(e) => { this.saveSelected(e.selectedKeys); }}
        onDeselect={(e) => { this.saveSelected(e.selectedKeys); }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.replace('\u0020', '\u005f').toLowerCase()}
          >
            {item}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem disabled>
          <Container
            className="text-center "
            style={{
              cursor: 'pointer',
              pointerEvents: 'visible',
            }}
            onClick={() => this.confirm()}
          >
            Select
          </Container>
        </MenuItem>
      </Menu>
    );
    return (
      <Dropdown
        trigger={['click']}
        onVisibleChange={this.onVisibleChange}
        visible={visible}
        closeOnSelect={false}
        overlay={menu}
      >
        <Button className="m-button">By Category</Button>
      </Dropdown>
    );
  }
}

CategoryDropdown.propTypes = {
  onApply: PropTypes.any.isRequired,
  items: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  homePath: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  addCategories: PropTypes.any.isRequired,
};

export default CategoryDropdown;
