import React, { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical, ChevronDown } from 'lucide-react';

const GENRES = [
  'Fiction',
  'Historical Fiction',
  'Science Fiction',
  'Thriller',
  'Mystery',
  'Horror',
  'Romance',
  'Memoir',
  'Non-Fiction',
  'Sports',
  'Fantasy',
  'Poetry'
].sort();

const TIMING_OPTIONS = [
  { value: '1', label: '📖 Reading Now' },
  { value: '2', label: '📅 Starting < 30 Days' },
  { value: '3', label: '🗓️ Starting > 30 Days' },
  { value: '4', label: '📚 To Read (Someday)' }
];

const BookList = ({ books, owner, canEdit, onDelete, onUpdateTiming }) => {
  if (books.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: 'rgba(255, 255, 255, 0.4)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
        <p style={{ margin: 0, fontSize: '18px' }}>{owner}'s queue is empty</p>
        {canEdit && <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Add your first book to get started</p>}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {books.map((book, index) => (
        <div
          key={book.id}
          style={{
            background: canEdit ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: `1px solid rgba(255, 255, 255, ${canEdit ? '0.1' : '0.05'})`,
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            animation: `fadeIn 0.5s ease ${index * 0.05}s both`
          }}
        >
          <div style={{ padding: '16px' }}>
            {/* Title */}
            <div style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '8px',
              lineHeight: '1.3'
            }}>
              {book.goodreadsLink ? (
                <a
                  href={book.goodreadsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#ffd89b',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(255, 216, 155, 0.3)',
                    transition: 'border-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.borderBottomColor = '#ffd89b'}
                  onMouseLeave={(e) => e.target.style.borderBottomColor = 'rgba(255, 216, 155, 0.3)'}
                >
                  {book.title}
                </a>
              ) : (
                book.title
              )}
            </div>

            {/* Genre Badge */}
            <div style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {book.genre}
            </div>

            {/* Timing - Dropdown if can edit, Display only if can't */}
            {canEdit ? (
              <div style={{ marginBottom: '12px' }}>
                <select
                  value={book.timing}
                  onChange={(e) => onUpdateTiming(book.id, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '15px',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 8px center',
                    backgroundSize: '20px',
                    paddingRight: '36px'
                  }}
                >
                  {TIMING_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value} style={{ background: '#1a0b2e' }}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div style={{
                padding: '10px 12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '15px',
                marginBottom: '12px'
              }}>
                {TIMING_OPTIONS.find(opt => opt.value === book.timing)?.label || '📚 To Read'}
              </div>
            )}

            {/* Delete Button - only if can edit */}
            {canEdit && (
              <button
                onClick={() => {
                  if (confirm(`Remove "${book.title}" from queue?`)) {
                    onDelete(book.id);
                  }
                }}
                style={{
                  background: 'rgba(220, 38, 38, 0.2)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  color: '#fca5a5',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(220, 38, 38, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(220, 38, 38, 0.2)';
                }}
              >
                <Trash2 size={14} />
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const USERS = ['Dan', 'Lucy'];

const USERS = ['Dan', 'Lucy'];

const BookClubApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [myBooks, setMyBooks] = useState([]);
  const [theirBooks, setTheirBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState('my'); // 'my', 'their', 'both'
  const [newBook, setNewBook] = useState({
    title: '',
    goodreadsLink: '',
    genre: '',
    timing: '4'
  });
  const [loading, setLoading] = useState(true);

  // Load books from storage
  useEffect(() => {
    loadBooks();
  }, [currentUser]);

  const loadBooks = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      // Load my books
      const myResult = await window.storage.get(`book-queue-${currentUser}`, true);
      if (myResult?.value) {
        setMyBooks(JSON.parse(myResult.value));
      } else {
        setMyBooks([]);
      }

      // Load their books
      const otherUser = USERS.find(u => u !== currentUser);
      const theirResult = await window.storage.get(`book-queue-${otherUser}`, true);
      if (theirResult?.value) {
        setTheirBooks(JSON.parse(theirResult.value));
      } else {
        setTheirBooks([]);
      }
    } catch (error) {
      console.log('No saved books yet');
      setMyBooks([]);
      setTheirBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const saveMyBooks = async (updatedBooks) => {
    try {
      await window.storage.set(`book-queue-${currentUser}`, JSON.stringify(updatedBooks), true);
      setMyBooks(updatedBooks);
    } catch (error) {
      console.error('Failed to save books:', error);
    }
  };

  const addBook = () => {
    if (!newBook.title || !newBook.genre) {
      alert('Please fill in title and genre');
      return;
    }

    const book = {
      id: Date.now().toString(),
      ...newBook,
      addedDate: new Date().toISOString()
    };

    const updatedBooks = [...myBooks, book];
    saveMyBooks(updatedBooks);
    
    setNewBook({ title: '', goodreadsLink: '', genre: '', timing: '4' });
    setShowAddForm(false);
  };

  const deleteBook = (id) => {
    const updatedBooks = myBooks.filter(b => b.id !== id);
    saveMyBooks(updatedBooks);
  };

  const updateTiming = (id, timing) => {
    const updatedBooks = myBooks.map(b => 
      b.id === id ? { ...b, timing } : b
    );
    saveMyBooks(updatedBooks);
  };

  const getTimingLabel = (value) => {
    return TIMING_OPTIONS.find(opt => opt.value === value)?.label || '📚 To Read';
  };

  const sortBooks = (bookList) => {
    return [...bookList].sort((a, b) => {
      if (a.timing !== b.timing) {
        return a.timing.localeCompare(b.timing);
      }
      return new Date(a.addedDate) - new Date(b.addedDate);
    });
  };

  const sortedMyBooks = sortBooks(myBooks);
  const sortedTheirBooks = sortBooks(theirBooks);
  const otherUser = USERS.find(u => u !== currentUser);

  // User selection screen
  if (!currentUser) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 100%)',
        padding: '20px'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>📚</div>
          <h1 style={{
            margin: '0 0 12px 0',
            fontSize: '32px',
            fontWeight: 400,
            background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: '"Crimson Text", Georgia, serif'
          }}>
            Book Club Queue
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '32px',
            fontFamily: '"Crimson Text", Georgia, serif',
            fontSize: '16px'
          }}>
            Who are you?
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {USERS.map(user => (
              <button
                key={user}
                onClick={() => setCurrentUser(user)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  padding: '20px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  fontFamily: '"Crimson Text", Georgia, serif',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {user}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 100%)',
        color: '#fff'
      }}>
        <div>Loading your book queue...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 100%)',
      fontFamily: '"Crimson Text", Georgia, serif',
      paddingBottom: '80px'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '20px 20px 16px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px'
        }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: 400,
              background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.5px'
            }}>
              Book Club Queue
            </h1>
            <p style={{
              margin: '4px 0 0 0',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '13px'
            }}>
              {currentUser}'s view
            </p>
          </div>
          <button
            onClick={() => {
              if (confirm('Switch user?')) {
                setCurrentUser(null);
              }
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'rgba(255, 255, 255, 0.7)',
              padding: '8px 12px',
              fontSize: '12px',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            Switch
          </button>
        </div>

        {/* View Mode Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '4px',
          borderRadius: '10px'
        }}>
          <button
            onClick={() => setViewMode('my')}
            style={{
              flex: 1,
              padding: '10px',
              background: viewMode === 'my' ? 'rgba(255, 216, 155, 0.2)' : 'transparent',
              border: viewMode === 'my' ? '1px solid rgba(255, 216, 155, 0.3)' : '1px solid transparent',
              borderRadius: '8px',
              color: viewMode === 'my' ? '#ffd89b' : 'rgba(255, 255, 255, 0.5)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s'
            }}
          >
            My Queue ({myBooks.length})
          </button>
          <button
            onClick={() => setViewMode('their')}
            style={{
              flex: 1,
              padding: '10px',
              background: viewMode === 'their' ? 'rgba(255, 216, 155, 0.2)' : 'transparent',
              border: viewMode === 'their' ? '1px solid rgba(255, 216, 155, 0.3)' : '1px solid transparent',
              borderRadius: '8px',
              color: viewMode === 'their' ? '#ffd89b' : 'rgba(255, 255, 255, 0.5)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s'
            }}
          >
            {otherUser}'s ({theirBooks.length})
          </button>
          <button
            onClick={() => setViewMode('both')}
            style={{
              flex: 1,
              padding: '10px',
              background: viewMode === 'both' ? 'rgba(255, 216, 155, 0.2)' : 'transparent',
              border: viewMode === 'both' ? '1px solid rgba(255, 216, 155, 0.3)' : '1px solid transparent',
              borderRadius: '8px',
              color: viewMode === 'both' ? '#ffd89b' : 'rgba(255, 255, 255, 0.5)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s'
            }}
          >
            Both
          </button>
        </div>
      </div>

      {/* Book List */}
      <div style={{ padding: '20px' }}>
        {viewMode === 'my' && (
          <BookList 
            books={sortedMyBooks} 
            owner={currentUser}
            canEdit={true}
            onDelete={deleteBook}
            onUpdateTiming={updateTiming}
          />
        )}

        {viewMode === 'their' && (
          <BookList 
            books={sortedTheirBooks} 
            owner={otherUser}
            canEdit={false}
            onDelete={deleteBook}
            onUpdateTiming={updateTiming}
          />
        )}

        {viewMode === 'both' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h2 style={{
                margin: '0 0 16px 0',
                fontSize: '20px',
                color: '#ffd89b',
                fontWeight: 600
              }}>
                {currentUser}'s Queue
              </h2>
              <BookList 
                books={sortedMyBooks} 
                owner={currentUser}
                canEdit={true}
                onDelete={deleteBook}
                onUpdateTiming={updateTiming}
              />
            </div>

            <div>
              <h2 style={{
                margin: '0 0 16px 0',
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: 600
              }}>
                {otherUser}'s Queue
              </h2>
              <BookList 
                books={sortedTheirBooks} 
                owner={otherUser}
                canEdit={false}
                onDelete={deleteBook}
                onUpdateTiming={updateTiming}
              />
            </div>
          </div>
        )}
      </div>

      {/* Add Button - Fixed at bottom - only show in "my" view */}
      {!showAddForm && viewMode === 'my' && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000
        }}>
          <button
            onClick={() => setShowAddForm(true)}
            style={{
              background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
              border: 'none',
              color: '#1a0b2e',
              padding: '16px 32px',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
            }}
          >
            <Plus size={20} />
            Add Book
          </button>
        </div>
      )}

      {/* Add Book Form Modal */}
      {showAddForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease'
        }}
        onClick={() => setShowAddForm(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #2d1b4e 0%, #1a0b2e 100%)',
              borderRadius: '24px 24px 0 0',
              padding: '24px',
              width: '100%',
              maxWidth: '500px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderBottom: 'none',
              animation: 'slideUp 0.3s ease'
            }}
          >
            <h2 style={{
              margin: '0 0 20px 0',
              fontSize: '24px',
              color: '#fff',
              fontWeight: 400
            }}>
              Add New Book
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '14px'
                }}>
                  Title *
                </label>
                <input
                  type="text"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  placeholder="Enter book title"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '15px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '14px'
                }}>
                  Goodreads Link
                </label>
                <input
                  type="url"
                  value={newBook.goodreadsLink}
                  onChange={(e) => setNewBook({ ...newBook, goodreadsLink: e.target.value })}
                  placeholder="https://www.goodreads.com/book/show/..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '15px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '14px'
                }}>
                  Genre *
                </label>
                <select
                  value={newBook.genre}
                  onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: newBook.genre ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                    fontSize: '15px',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="" style={{ background: '#1a0b2e' }}>Select a genre</option>
                  {GENRES.map(genre => (
                    <option key={genre} value={genre} style={{ background: '#1a0b2e', color: '#fff' }}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '14px'
                }}>
                  When to Read
                </label>
                <select
                  value={newBook.timing}
                  onChange={(e) => setNewBook({ ...newBook, timing: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '15px',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  {TIMING_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value} style={{ background: '#1a0b2e' }}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '8px'
              }}>
                <button
                  onClick={() => setShowAddForm(false)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={addBook}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#1a0b2e',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Add Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        input::placeholder,
        select::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        input:focus,
        select:focus {
          outline: none;
          border-color: rgba(255, 216, 155, 0.5);
        }

        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600&display=swap');
      `}</style>
    </div>
  );
};

export default BookClubApp;
