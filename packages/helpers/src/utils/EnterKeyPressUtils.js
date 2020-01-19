export const handleEnter = (event) => {
    let increment = 1;
    if (event.keyCode === 13) {
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        increment = event.currentTarget.children.length ? 2 : 1;
        form.elements[index + increment].focus();
        if (increment !== 2)
            event.preventDefault();
    }
};

