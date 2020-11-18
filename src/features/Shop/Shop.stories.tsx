import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {Shop} from "./Shop";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Example/Shop',
    component: Shop,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as Meta;

const Template: Story = (args) => <Shop products={[]} addProducts={(action('added in cart'))} {...args} />;

export const ShopExample = Template.bind({});
ShopExample.args = {
    products: [{
        id: '1',
        title: 'Asus',
        price: 10000,
        count: 0,
        urlImg: '"https://cdn.worldvectorlogo.com/logos/asus-6630.svg"'
    },
        {
            id: '0',
            title: 'Apple',
            price: 9000,
            count: 0,
            urlImg: '"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrj8RO-VnaBpdVkb75nDb_HVC3C-DWA6Q1dA&usqp=CAU"'
        }],
    label: 'Shop',
};
