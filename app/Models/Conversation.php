<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id1',
        'user_id2',
        'last_message_id',
    ];

    public function lastMessage()
    {
        return $this->belongsTo(Message::class, 'last_message_id');
    }

    public function user1()
    {
        return $this->belongsTo(User::class, 'user_id1');
    }

    public function user2()
    {
        return $this->belongsTo(User::class, 'user_id2');
    }

    public static function getConversationForSidebar(User $user)
    {
        $users = User::getUsersExpectUser($user);
        $groups = Group::getGroupsForUser($user);

        return $users->map(fn(User $user) => $user->toConversationArray())
            ->concat(
                $groups->map(fn(Group $group) => $group->toConversationArray())
            );
    }
}
