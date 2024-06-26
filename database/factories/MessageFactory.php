<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $senderId = $this->faker->randomElement([0, 1]);

        if ($senderId === 0) {
            $senderId = $this->faker->randomElement(\App\Models\User::pluck('id')->toArray());
            $recieverId = 1;
        } else {
            $recieverId = $this->faker->randomElement(\App\Models\User::pluck('id')->toArray());
        }

        $groupId = null;

        if ($this->faker->boolean(50)) {
            $groupId = $this->faker->randomElement(\App\Models\Group::where("id", "!=", 1)->pluck('id')->toArray());

            // select group by group id
            $group = \App\Models\Group::find($groupId);
            $senderId = $this->faker->randomElement($group->users->pluck('id')->toArray());
            $recieverId = null;
        }

        return [
            'sender_id' => $senderId,
            'receiver_id' => $recieverId,
            'group_id' => $groupId,
            'message' => $this->faker->realText(200),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
