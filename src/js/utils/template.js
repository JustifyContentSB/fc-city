import $ from 'jquery';
import Handlebars from 'handlebars/dist/handlebars';

import { mode, paths } from '../config';

import Warning from '../components/warning';

const warning = new Warning('Handlebars');

const { templates: rootPath } = paths;

export const loadTemplate = async(template, path = rootPath) => {
    if (!template) return;

    if (!window.templates) {
        window.templates = {};
    };

    if (window.templates[template]) {
        return window.templates[template];
    };

    const directory = (path !== rootPath) ? `${rootPath}/${path}` : path;

    try {
        const data = await $.get(`${directory}/${template}.hbs?v=1`, 'html');

        window.templates[template] = data;

        return data;
    } catch(e) {
        warning.show(`При загрузке шаблона ${template} произошла ошибка, попробуйте позже`);
    };
};

export const loadTemplates = async(templates, path = rootPath) => {
    if (!templates || !Array.isArray(templates)) return;

    try {
        for (const template of templates) {
            await loadTemplate(template, path);
        };
    } catch(e) {
        warning.show('При загрузке шаблонов произошла ошибка, попробуйте позже');
    };
};

export const renderTemplate = (id, data, wrapped) => {
    if (!window.templates || !window.templates[id]) return '';
    console.log('🚀  →', );

    const template = window.templates[id];
    console.log('🚀 Handlebars →', Handlebars);
    const html = Handlebars.compile(template)(data);

    return wrapped ? $(html) : html;
};
