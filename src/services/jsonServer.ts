import {api} from '../api/server';

export const buscarPlacarNormal = async () => {
    try {
        const response = await api.get('/scores');
        console.log(response.data.results);
    } catch (error) {
        console.error('Falha na requisição:', error);
    }
}

export const buscarPlacarTemporizado = async () => {
    try {
        const response = await api.get('/timedscores');
        console.log(response.data.results);
    } catch (error) {
        console.error('Falha na requisição:', error);
    }
}

export const salvarPlacarNormal = async (payload) => {
    try {
        const response = await api.post('/scores', payload);
        console.log(response.data);
    } catch (error) {
        console.error('Falha na requisição:', error);
    }
}

export const salvarPlacarTemporizado = async (payload) => {
    try {
        const response = await api.post('/timedscores', payload);
        console.log(response.data.results);
    } catch (error) {
        console.error('Falha na requisição:', error);
    }
}