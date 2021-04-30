interface IObservable{
    Add:(observer: IObserver) =>{},
    Remove:(observer: IObserver) =>{},
    Notify:() =>{}
}