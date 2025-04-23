import { boolean, date, datetime, decimal, float, int, mysqlEnum, mysqlTable, primaryKey, text, time, timestamp, unique, varchar, year } from "drizzle-orm/mysql-core";

export const USER_DETAILS = mysqlTable('user_details', {
    id: int('id').notNull().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    dob: date('dob').notNull(),
    gender: varchar('gender', { length: 50 }).notNull(),
    location: varchar('location', { length: 255 }).notNull(),
    education: varchar('education', { length: 255 }).notNull(),
    religion: varchar('religion', { length: 100 }).notNull(),
    height: int('height').notNull(),
    weight: int('weight').notNull(),
    university: varchar('university', { length: 50 }).notNull(),
    citizenship: varchar('citizenship', { length: 20 }).notNull()
});
// export const USER=mysqlTable('user',{
//     id: int('id').notNull().primaryKey().autoincrement(),
//     username: varchar('username', { length: 255 }).notNull(),
//     birthDate: date('birthDate').notNull(),
//     password:varchar('password',{length:150}).default(null),
//     gender:varchar('gender',{length:150}).default(null)
// })

// Existing USER table - Extended
export const USER = mysqlTable('user', {
  id: int('id').notNull().primaryKey().autoincrement(),
  username: varchar('username', { length: 255 }).notNull(),
  birthDate: date('birthDate').notNull(),
  gender: varchar('gender', { length: 150 }).default(null),
  password: varchar('password', { length: 150 }).default(null),

  // New fields
  phone: varchar('phone', { length: 20 }).default(null),
  isPhoneVerified: boolean('is_phone_verified').default(false),

  email: varchar('email', { length: 255 }).default(null),
  isEmailVerified: boolean('is_email_verified').default(false),

  profileImageUrl: varchar('profile_image_url', { length: 500 }).default(null),

  country: varchar('country', { length: 150 }).default(null),
  state: varchar('state', { length: 150 }).default(null),
  city: varchar('city', { length: 150 }).default(null),

  religion: varchar('religion', { length: 150 }).default(null),
  caste: varchar('caste', { length: 150 }).default(null),

  height: decimal('height', { precision: 5, scale: 2 }).default(null), // e.g., 170.00 cm
  weight: decimal('weight', { precision: 5, scale: 2 }).default(null), // e.g., 65.00 kg

  income: varchar('income', { length: 100 }).default(null),

  isProfileVerified: boolean('is_profile_verified').default(false),
  isProfileComplete: boolean('is_profile_complete').default(false), // check during update
});

export const EDUCATION_LEVELS = mysqlTable('education_levels', {
  id: int('id').notNull().primaryKey().autoincrement(),
  levelName: varchar('level_name', { length: 255 }).notNull().unique(),
});

export const USER_EDUCATION = mysqlTable('user_education', {
  id: int('id').notNull().primaryKey().autoincrement(),
  user_id: int('user_id').notNull(),
  education_level_id: int('education_level_id').notNull().references(() => EDUCATION_LEVELS.id),
  degree: varchar('degree', { length: 255 }).notNull(),
  graduationYear: year('graduation_year').default(null)
});

export const JOB_TITLES = mysqlTable('job_titles', {
  id: int('id').notNull().primaryKey().autoincrement(),
  title: varchar('title', { length: 150 }).notNull().unique(),
});

export const USER_JOB = mysqlTable('user_job', {
  id: int('id').notNull().primaryKey().autoincrement(),
  user_id: int('user_id').notNull(),
  job_title_id: int('job_title_id').notNull().references(() => JOB_TITLES.id),
  // jobTitle: varchar('job_title', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }).default(null),
  location: varchar('location', { length: 255 }).default(null)
});

export const USER_LANGUAGES = mysqlTable('user_languages', {
    id: int('id').notNull().primaryKey(),
    user_id: int('user_id').notNull(),
    language_id: int('language_id').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow()
}); 

export const USER_OCCUPATION = mysqlTable('user_occupation', {
    id: int('id').notNull().primaryKey(),
    user_id: int('user_id').notNull(),
    place: varchar('place', { length: 255 }).notNull(),
    empt_type: varchar('empt_type', { length: 100 }).notNull(),
    emp_name: varchar('emp_name', { length: 255 }).default(null),
    emp_nature: varchar('emp_nature', { length: 255 }).notNull(),
    annual_income: int('annual_income', { length: 20 }).notNull()
});

export const LANGUAGES = mysqlTable('languages', {
    id: int('id').notNull().primaryKey(),
    title: varchar('title', { length: 256 }).notNull(),
    created_at: timestamp('created_at').notNull().defaultNow()
});

export const ACCOUNT_CREATOR= mysqlTable('account_creator',{
    id:int('id').autoincrement().notNull().primaryKey(),
    title:varchar('title',{length:200}).notNull(),
    created_date: datetime('created_at').notNull(),
});

export const ANALYTICS_QUESTION = mysqlTable('analytics_question', {
    id: int('id').primaryKey().autoincrement(),
    question_text: varchar('question_text', { length: 300 }).notNull(),
    quiz_id: int('quiz_id').notNull(),
});

export const OPTIONS = mysqlTable('options', {
    id: int('id').primaryKey().autoincrement(),
    option_text: varchar('option_text', { length: 300 }).notNull(),
    analytic_id: int('analytic_id').notNull(),
    question_id: int('question_id').notNull(),
});

export const QUIZ_SEQUENCES = mysqlTable('quiz_sequences', {
    id: int('id').primaryKey().autoincrement(),
    type_sequence: text('type_sequence').notNull().default(''),
    user_id: int('user_id').notNull(),
    quiz_id: int('quiz_id').notNull(), 
    createddate: datetime('createddate').notNull(),
    isCompleted: boolean('isCompleted').notNull().default(false), 
    isStarted: boolean('isStarted').notNull().default(false),    
});

export const MBTI_COMPATIBILITY = mysqlTable('mbti_compatibility', {
  id: int('id').primaryKey().autoincrement(),
  mbtiType: varchar('mbti_type', { length: 4 }).notNull(),
  compatibleType: varchar('compatible_type', { length: 4 }).notNull(),
  tier: mysqlEnum('tier', ['great', 'good', 'average', 'not_ideal', 'bad']).notNull(),
  match_order: int('match_order').notNull(),
}, (table) => ({
  uniqueMbtiMatch: unique().on(table.mbtiType, table.compatibleType),
}));

export const USER_PROGRESS = mysqlTable('user_progress', {
    id: int('id').primaryKey().autoincrement(),
    user_id: int('user_id').notNull(),
    question_id: int('question_id').notNull(),
    option_id: int('option_id').notNull(),
    analytic_id: int('analytic_id').notNull(),
    created_at: datetime('created_at').notNull(),
});

export const TESTS = mysqlTable('tests', {
    test_id: int('test_id').autoincrement().primaryKey(),
    test_name: varchar('test_name', { length: 255 }).notNull(),  
    description: text('description').default(null), 
    total_questions: int('total_questions').notNull(),
    created_at: timestamp('created_at').defaultNow(),
  });

export const QUESTIONS = mysqlTable('questions', {
    id: int('id').autoincrement().primaryKey(), 
    questionText: varchar('question_text', { length: 255 }).notNull(),
    test_id: int('test_id').notNull().references(() => TESTS.test_id),
  
  });

  export const ANSWERS = mysqlTable('answers', {
    id: int('id').autoincrement().primaryKey(),  // Auto-incrementing primary key for answers
    question_id: int('question_id').notNull().references(() => QUESTIONS.id),  // Foreign key to the questions table
    answerText: varchar('answer_text', { length: 255 }).notNull(),  // Answer text
    points: int('points').notNull(),  // Points for each answer
});

export const QUIZ_COMPLETION = mysqlTable('quiz_completion', {
    completion_id: int('completion_id').autoincrement().primaryKey(),  
    user_id: int('user_id').notNull().references(() => USER_DETAILS.id),
    test_id: int('test_id').notNull().references(() => TESTS.test_id),
    isStarted: boolean('isStarted').notNull().default(false), 
    completed: mysqlEnum('completed', ['no', 'yes']).notNull().default('no'),
    completion_timestamp: timestamp('completion_timestamp').defaultNow(),
});

export const COMPATIBILITY_RESULTS = mysqlTable('compatibility_results', {
    result_id: int('result_id').autoincrement().primaryKey(),  // Auto-incrementing primary key for results
    test_id: int('test_id').notNull().references(() => TESTS.test_id),  
    user_1_id: int('user_1_id').notNull().references(() => USER.id),
    user_2_id: int('user_2_id').notNull().references(() => USER.id), 
    compatibilityScore: int('compatibility_score').default(0), 
});

export const TEST_PROGRESS  = mysqlTable('test_progress', {
    progress_id: int('progress_id').autoincrement().primaryKey(), // Auto-incrementing primary key for progress
    user_id: int('user_id').notNull().references(() => USER_DETAILS.id), // Reference to the user taking the test
    test_id: int('test_id').notNull().references(() => TESTS.test_id),
    question_id: int('question_id').notNull().references(() => QUESTIONS.id), // Reference to the current question
    selected_answer_id: int('selected_answer_id').references(() => ANSWERS.id).default(null), // Optional: Reference to the selected answer
    points_received: int('points_received').default(0), // New field to store points the user got for the question
    progress_timestamp: timestamp('progress_timestamp').defaultNow(), // Timestamp for each progress entry
  });

  export const INVITATIONS = mysqlTable('invitations', {
    id: int('id').autoincrement().primaryKey(),
    user_id: int('user_id').notNull().references(() => USER.id), // ID of the invited user
    inviter_id: int('inviter_id').notNull().references(() => USER.id), // ID of the user who shared the link
    compatibility_checked: boolean('compatibility_checked').notNull().default(false), // Whether compatibility was checked
    created_at: timestamp('created_at').defaultNow(),
  });

  export const COUPLES = mysqlTable('couples', {
    id: int('id').autoincrement().primaryKey(),
    user_id: int('user_id').notNull().references(() => USER.id), // Reference to the user who sent the request
    couple_id: int('couple_id').notNull().references(() => USER.id), // Reference to the user receiving the request
    status: mysqlEnum('status', ['pending', 'accepted', 'rejected']).notNull().default('pending'), // Status of the couple request
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const PEOPLE_PAIR = mysqlTable('people_pair', {
    id: int('id').autoincrement().primaryKey(),
    pair1: varchar('pair1', { length: 4 }).notNull(),
    pair2: varchar('pair2', { length: 4 }).notNull(),
    description: text('description').default(null)
  });

  export const USER_RED_FLAGS = mysqlTable('user_red_flags', {
    id: int('id').autoincrement().primaryKey(),
    user_id: int('user_id').notNull().references(() => USER.id, { onDelete: 'cascade' }),
    answer_id: int('answer_id').notNull().references(() => ANSWERS.id, { onDelete: 'cascade' }),
    created_at: timestamp('created_at').defaultNow()
  }, (table) => {
    return {
      userAnswerUnique: unique('user_answer_unique').on(table.user_id, table.answer_id)
    }
  });

  export const CONNECTIONS = mysqlTable("connections", {
    connectionId: int("connection_id").primaryKey().autoincrement(),
    senderId: int("sender_id").notNull().references(() => USER.id),
    receiverId: int("receiver_id").notNull().references(() => USER.id),
    status: mysqlEnum("status", ["pending", "accepted", "rejected", "blocked"]).default("pending"),
    requestedAt: timestamp("requested_at").defaultNow(),
    respondedAt: timestamp("responded_at"),
  });

export const CONVERSATIONS = mysqlTable('conversations', {
  id: int('id').autoincrement().primaryKey(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().onUpdateNow(),
  last_message_at: timestamp('last_message_at').defaultNow(),
  is_group: boolean('is_group').default(false),    // For future extension to group chats
  name: varchar('name', { length: 100 }).default(null),  // For group chats
  created_by: int('created_by').notNull().references(() => USER.id, { onDelete: 'cascade' }),
});


export const CONVERSATION_PARTICIPANTS = mysqlTable('conversation_participants', {
  id: int('id').autoincrement().primaryKey(),
  conversation_id: int('conversation_id').notNull().references(() => CONVERSATIONS.id, { onDelete: 'cascade' }),
  user_id: int('user_id').notNull().references(() => USER.id, { onDelete: 'cascade' }),
  joined_at: timestamp('joined_at').defaultNow(),
  left_at: timestamp('left_at').default(null),  // If user left the conversation
  is_admin: boolean('is_admin').default(false), // For group chats
  is_muted: boolean('is_muted').default(false),
  last_read_at: timestamp('last_read_at').default(null), // When user last read the conversation
}, (table) => {
  return {
    // Ensure a user can only be in a conversation once (currently active)
    userConvoUnique: unique('user_convo_unique').on(table.conversation_id, table.user_id)
  };
});


export const MESSAGES = mysqlTable('messages', {
  id: int('id').autoincrement().primaryKey(),
  conversation_id: int('conversation_id').notNull().references(() => CONVERSATIONS.id, { onDelete: 'cascade' }),
  sender_id: int('sender_id').notNull().references(() => USER.id, { onDelete: 'cascade' }),
  content: text('content').default(null),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().onUpdateNow(),
  is_edited: boolean('is_edited').default(false),
  is_deleted: boolean('is_deleted').default(false),
  reply_to_id: int('reply_to_id').references(() => MESSAGES.id).default(null), // For reply functionality
  message_type: mysqlEnum('message_type', ['text', 'image', 'file', 'audio', 'video', 'system']).default('text'),
});

export const MESSAGE_ATTACHMENTS = mysqlTable('message_attachments', {
  id: int('id').autoincrement().primaryKey(),
  message_id: int('message_id').notNull().references(() => MESSAGES.id, { onDelete: 'cascade' }),
  file_name: varchar('file_name', { length: 255 }).notNull(),
  file_path: varchar('file_path', { length: 500 }).notNull(),
  file_type: varchar('file_type', { length: 100 }).notNull(), // MIME type
  file_size: int('file_size').notNull(),  // Size in bytes
  created_at: timestamp('created_at').defaultNow(),
  width: int('width').default(null),      // For images/videos
  height: int('height').default(null),    // For images/videos
  duration: float('duration').default(null), // For audio/video in seconds
  thumbnail_path: varchar('thumbnail_path', { length: 500 }).default(null), // For preview
});

export const MESSAGE_READS = mysqlTable('message_reads', {
  id: int('id').autoincrement().primaryKey(),
  message_id: int('message_id').notNull().references(() => MESSAGES.id, { onDelete: 'cascade' }),
  user_id: int('user_id').notNull().references(() => USER.id, { onDelete: 'cascade' }),
  read_at: timestamp('read_at').defaultNow(),
}, (table) => {
  return {
    // Ensure a message is only marked as read once per user
    messageReadUnique: unique('message_read_unique').on(table.message_id, table.user_id)
  };
});

export const MESSAGE_REACTIONS = mysqlTable('message_reactions', {
  id: int('id').autoincrement().primaryKey(),
  message_id: int('message_id').notNull().references(() => MESSAGES.id, { onDelete: 'cascade' }),
  user_id: int('user_id').notNull().references(() => USER.id, { onDelete: 'cascade' }),
  reaction: varchar('reaction', { length: 50 }).notNull(), // Emoji or reaction code
  created_at: timestamp('created_at').defaultNow(),
}, (table) => {
  return {
    // Ensure a user can only have one reaction per message
    userReactionUnique: unique('user_reaction_unique').on(table.message_id, table.user_id)
  };
});

export const USER_CHAT_SETTINGS = mysqlTable('user_chat_settings', {
  id: int('id').autoincrement().primaryKey(),
  user_id: int('user_id').notNull().references(() => USER.id, { onDelete: 'cascade' }).unique(),
  notification_enabled: boolean('notification_enabled').default(true),
  sound_enabled: boolean('sound_enabled').default(true),
  muted_until: timestamp('muted_until').default(null), // Temporarily mute all notifications
  theme: varchar('theme', { length: 50 }).default('light'),
  message_preview_enabled: boolean('message_preview_enabled').default(true),
  read_receipts_enabled: boolean('read_receipts_enabled').default(true),
  typing_indicators_enabled: boolean('typing_indicators_enabled').default(true),
  last_active_at: timestamp('last_active_at').default(null),
  updated_at: timestamp('updated_at').defaultNow().onUpdateNow(),
});