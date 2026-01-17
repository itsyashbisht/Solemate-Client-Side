import ProfilePage from "../components/Profilepage";
import Navigation from "../layouts/Navigation";

export default function Profile() {
  return (
    <div className="flex flex-col min-h-full">
      <Navigation />
      <main>
        <ProfilePage />
      </main>
    </div>
  );
}
