# How to get datas

As you have probably already seen, when you define a data via `datas['name']` or `datas.name` you can retrieve this data in a component as follows: `x-text="name" `.

## What can we put in the x-attributes ?

Attributes can only contain paths, the only accepted separator is the `.` and it is optionally possible to specify a negation indicator `!` at the beginning of the path.

Attributes do not contain javascript expressions, this implies that the following are invalid:
- Comparison operators
- Assignment operators
- Functions and parameters
- Etc...

## Match binding

It is also possible to specify a string containing one or more datas inside braces: `x-text="My name is {name}"`. Note that the return value will then always be a string (which is not suitable for [actions](./actions.md) or [specific attributes](./attributes.md) like `x-show`, `x-append`, etc...).

## The filters

It is possible to specify [filters](./methods.md#thisfilter) (if they have been defined beforehand) in order to modify the return value: `x-text="name|capitalize"`.

## The depth

Each property of your data is readable from the attributes. For the array `datas.array = ['john', 'jane', 'jack']` you can get `jane` like this: `x-text="array.1"`.

You can also access the array length like this: `x-text="array.length"`.

You may notice that `x-text="array[1]"` will not work, because the string defined in the attributes is not the equivalent of an expression in javascript, only `.` are accepted as separators.

## The negation

You can specify a negation flag by putting a `!` at the beginning of the path in the attribute.

```js
define('cart', function(datas, render){
    datas['products'] = [];
    render(/*html*/`
        <div x-show="products.length">
            Product list here !
        </div>
        <div x-show="!products.length">
            You don't have any product in your cart...
        </div>
    `)
})
```