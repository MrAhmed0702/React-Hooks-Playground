import { useState, useMemo} from 'react';
import useDebounce from './hooks/UseDebounce';
import { useFocusTimer } from './hooks/UseFocusTimer';
import { useGithubUser } from './hooks/UseGithubUser';

function App() {
  const [char, setChar] = useState('');
  const [users, setUsers] = useState('');

  const { seconds, elapsed, handleFocus, handleBlur } = useFocusTimer();
  const debounceChar = useDebounce(char, 1000);

  const reversed = useMemo(() => debounceChar.split('').reverse().join(''), [debounceChar]);

  const { userData, loading, error } = useGithubUser(users);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      {/* Character Input */}
      <div className="bg-amber-100 p-6 rounded-xl shadow-md space-y-3">
        <h2 className="text-xl font-bold text-amber-800">Character Input</h2>
        <input
          className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          type="text"
          value={char}
          onChange={(e) => setChar(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Type something..."
        />
        <div className="space-y-1 text-sm">
          <p className="text-blue-700">Character count: {char.length}</p>
          <p className="text-green-700">Focused for: {seconds + elapsed.current}s</p>
          <p className="text-purple-700">Reversed: {reversed}</p>
          <p className="text-red-600">Debounced text: {debounceChar}</p>
        </div>
      </div>

      {/* GitHub User Search */}
      <div className="bg-purple-100 p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold text-purple-800">GitHub User Search</h2>
        <div className="flex items-center gap-3">
          <input
            className="flex-1 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="text"
            value={users}
            onChange={(e) => setUsers(e.target.value)}
            placeholder="Enter GitHub username..."
          />
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {userData && (
          <div className="mt-4 p-4 border border-purple-300 rounded-lg bg-purple-50 flex items-center gap-4">
            <img
              src={userData.avatar_url}
              alt={userData.login}
              className="w-16 h-16 rounded-full border border-purple-300"
            />
            <div className="space-y-1 text-sm">
              <p><span className="font-semibold">Name:</span> {userData.name || 'N/A'}</p>
              <p><span className="font-semibold">Bio:</span> {userData.bio || 'N/A'}</p>
              <p><span className="font-semibold">Followers:</span> {userData.followers}</p>
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
