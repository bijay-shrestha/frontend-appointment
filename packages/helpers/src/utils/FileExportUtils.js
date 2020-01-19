export const exportEXCEL = (data, fileName) => {
    let file = new Blob([data], {
        type: 'application/vnd.ms-excel'
    });
    let fileURL = URL.createObjectURL(file);
    let a = document.createElement('a');
    a.href = fileURL;
    a.target = '_blank';
    a.download = fileName + '.xls';
    document.body.appendChild(a);
    a.click();
};

export const exportPDF = (data, filename) => {
    let file = new Blob([data], {
        type: 'application/pdf'
    });

    let fileURL = URL.createObjectURL(file);
    let a = document.createElement('a');
    a.href = fileURL;
    a.target = '_blank';
    a.download = filename + '.pdf';
    document.body.appendChild(a);
    a.click();
};
