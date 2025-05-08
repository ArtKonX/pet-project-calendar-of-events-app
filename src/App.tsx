import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import CalendarPage from './pages/CalendarPage';
import CreateEventPage from './pages/CreateEventPage';
import DateEventsPage from './pages/DateEventsPage';
import EditPage from './pages/EditPage';
import AboutUsPage from './pages/AboutUsPage';
import NotFoundPage from './pages/NotFoundPage';
import NotificationHandler from './components/notification/NotificationHandler/NotificationHandler';
import EventDataHandler from './components/notification/EventDataHandler/EventDataHandler';
import { useEffect } from 'react';
import { useSelector } from './hooks/useTypedSelector';
import { selectLangsData } from './selectors/selectors';
import { resetLangs } from './redux/slices/langsSlice';
import { useDispatch } from 'react-redux';

function App() {

  const langsData = useSelector(selectLangsData);
  const dispatch = useDispatch();

  useEffect(() => {
    const htmlTag = document.documentElement;
    htmlTag.setAttribute('lang', langsData.lang);
  }, [langsData.lang]);

  useEffect(() => {
    // Для очистки массива добавленных языков

    return () => {
      dispatch(resetLangs())
    }
  }, [])

  return (
    <BrowserRouter basename='/pet-project-calendar-of-events-app'>
      <NotificationHandler />
      <EventDataHandler />
      <Routes>
        <Route path="/" element={
          <CalendarPage />
        } />
        <Route path="/create-event" element={
          <CreateEventPage />
        } />
        <Route path="/event/:id" element={
          <DateEventsPage />
        } />
        <Route path="/edit/:id" element={
          <EditPage />
        } />
        <Route path="/about-us" element={
          <AboutUsPage />
        } />
        <Route path="*" element={
          <NotFoundPage />
        } />
      </Routes>
    </ BrowserRouter>
  )
}

export default App
