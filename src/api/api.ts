import axios from "axios";

const instance = axios.create({
    baseURL: 'https://shop2-828f9.firebaseio.com/'
})

/*type CommonApiType<T> = {
    resultCode: 0| 1 | 100
    messages: Array<string>
    data: T,

}*/

export const api = {

    /*createTodolist(title: string) {
        return instance.post<CommonApiType<{ item: TodoType }>>("todo-lists", {title: title})
            .then(res => res.data);
    },*/
    /*updateTitleTodolist(title: string, todolistId: string) {
        return instance.put(`/todo-lists/${todolistId}/`, {title: title})
            .then(res => res.data);
    },*/
    getProducts() {
        return instance.get("/")
            .then(res => res.data)
    },
}